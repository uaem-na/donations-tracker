export default function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() =>
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        )
      }
    >
      <img src="/compass.svg" alt="compass - locate me" />
    </button>
  );
}
