import usePlacesAutocomplete, { 
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";


export default function Search({ panTo }) {
    const {
      ready, 
      value, 
      suggestions: { status, data }, 
      setValue, 
      clearSuggestions
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {lat: () => 45.504717, lng: () => -73.576456},
        radius: 100 * 1000,
      }
    });
  
    return (
      <div className="search">
        <Combobox 
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
                const results = await getGeocode({address});
                const { lat, lng } = getLatLng(results[0]);
                panTo({ lat, lng });
            } catch (error) {
                console.log("error!")
            }
          }}
        >
        <ComboboxInput 
            value={value} 
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter an address"
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map(({ place_id, description }) => (
                <ComboboxOption 
                    key={place_id}
                    value={description}
                />))}
            </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
    )
  }