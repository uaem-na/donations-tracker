export class GeoCluster {
  constructor(private elements, private bias) {}

  getGeoCluster() {
    return this.cluster();
  }

  private cluster() {
    if (typeof this.bias !== "number" || isNaN(this.bias)) {
      this.bias = 1;
    }

    let tot_diff = 0;
    let diffs: number[] = [];
    let diff;

    for (let i = 1; i < this.elements.length; i++) {
      diff = this.dist(
        this.elements[i][0],
        this.elements[i][1],
        this.elements[i - 1][0],
        this.elements[i - 1][1]
      );
      tot_diff += diff;
      diffs.push(diff);
    }

    const mean_diff = tot_diff / diffs.length;
    let variance = 0;

    diffs.forEach((diff) => {
      variance += Math.pow(diff - mean_diff, 2);
    });

    const stdev = Math.sqrt(variance / diffs.length);
    const threshold = stdev * this.bias;

    let clusterMap: any = [];

    const eCentroid = this.elements[0];

    clusterMap.push({
      centroid: [eCentroid[0], eCentroid[1]],
      points: [],
      ids: [],
    });

    let changing = true;
    let visited: Set<string> = new Set();

    while (changing) {
      let newCluster = false;
      let clusterChanged = false;

      this.elements.forEach((e, ei) => {
        let closestDist = Infinity;
        let closestCluster = null;

        clusterMap.forEach((cluster, ci) => {
          const dist = this.dist(
            e[0],
            e[1],
            clusterMap[ci].centroid[0],
            clusterMap[ci].centroid[1]
          );
          if (dist < closestDist) {
            closestDist = dist;
            closestCluster = ci;
          }
        });

        const [lat, lng, id] = e;

        if (!visited.has(`${id}`)) {
          if (closestDist < threshold || closestDist === 0) {
            clusterMap[closestCluster!].points.push([lat, lng]);
            clusterMap[closestCluster!].ids.indexOf(id) <= -1 &&
              clusterMap[closestCluster!].ids.push(id);
          } else {
            clusterMap.push({
              centroid: [lat, lng],
              points: [e],
              ids: [id],
            });
            newCluster = true;
          }
          visited.add(`${id}`);
        }
      });

      clusterMap = clusterMap.filter((cluster) => {
        return cluster.points.length > 0;
      });

      clusterMap.forEach((cluster, ci) => {
        const centroid = this.centroid(cluster.points);
        if (
          centroid[0] !== cluster.centroid[0] ||
          centroid[1] !== centroid[1]
        ) {
          clusterMap[ci].centroid = centroid;
          clusterChanged = false;
        }
      });

      if (!clusterChanged && !newCluster) {
        changing = false;
      }
    }

    return clusterMap;
  }

  private dist(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const dlat = (lat2 - lat1).toRad();
    const dlng = (lng2 - lng1).toRad();

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.sin(dlng / 2) *
        Math.sin(dlng / 2) *
        Math.cos(lat1.toRad()) *
        Math.cos(lat2.toRad());
    return (
      Math.round(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 6371 * 100) /
      100
    );
  }

  private centroid(set) {
    return set
      .reduce(
        (s, e) => {
          return [s[0] + e[0], s[1] + e[1]];
        },
        [0, 0]
      )
      .map((e) => e / set.length);
  }
}

declare global {
  interface Number {
    toRad: () => number;
  }
}

Number.prototype.toRad = function () {
  return ((this as number) * Math.PI) / 180;
};
