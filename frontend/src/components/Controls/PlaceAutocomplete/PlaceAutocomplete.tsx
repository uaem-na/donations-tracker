import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoadExternalScript, useOutsideClick } from "@hooks";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

/*
 * TODO: Make it more accessible, focus trapping and keyboard navigation
 * */
export const PlaceAutocomplete = ({ onSelect, setValue, ...props }) => {
  const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const externalScript = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&callback=init`;
  const scripStatus = useLoadExternalScript(externalScript);

  const {
    ready,
    value: suggestionValue,
    suggestions: { status, data },
    setValue: setSuggestionValue,
    clearSuggestions,
    clearCache,
  } = usePlacesAutocomplete({
    callbackName: "init",
    debounce: 300,
    requestOptions: {
      types: ["street_address"],
      componentRestrictions: { country: ["ca"] },
    },
  });

  const ref = useOutsideClick(() => {
    clearCache();
    clearSuggestions();
  });

  const handleInput = async (e, isSubmitted) => {
    setSuggestionValue(e.target.value);
    setValue(props.name, e.target.value);
  };

  function getGecodeLocation(description) {
    return getGeocode({ address: description })
      .then((result) => {
        if (result.length > 0) {
          const addressComponents = result[0].address_components ?? [];
          const r = addressComponents.reduce((acc: any, component: any) => {
            if (component.types.includes("street_number")) {
              acc.street_number = component.long_name;
            }
            if (component.types.includes("route")) {
              acc.street_name = component.long_name;
            }
            if (component.types.includes("locality")) {
              acc.city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              acc.province = component.long_name;
              acc.provinceCode = component.short_name;
            }
            if (component.types.includes("postal_code")) {
              acc.postalCode = component.long_name;
            }
            return acc;
          }, {});

          return Promise.resolve(r);
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  const handleSelect =
    ({ description, structured_formatting }) =>
    async () => {
      setSuggestionValue(structured_formatting.main_text, false);
      clearSuggestions();
      const r = await getGecodeLocation(description);
      setValue(props.name, description);
      onSelect(r);
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-purple-50"
          role="option"
          onClick={handleSelect(suggestion)}
          tabIndex={0}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await handleSelect(suggestion)();
            }
          }}
        >
          <span className="block truncate">
            {main_text}
            <div>
              <small>{secondary_text}</small>
            </div>
          </span>
        </li>
      );
    });

  return (
    <>
      {scripStatus === "ready" ? (
        <Controller
          name={props.name}
          control={props.control}
          rules={props.rules}
          defaultValue={props.defaultValue || ""}
          render={({ fieldState: { error }, formState: { isSubmitted } }) => {
            return (
              <>
                <div ref={ref} className="relative mt-2">
                  <input
                    {...props}
                    type="text"
                    className={twMerge(
                      "w-full rounded-md text-sm border-0 py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6",
                      error
                        ? "text-red-900 ring-red-400 placeholder:text-red-400 focus:ring-red-500"
                        : "ring-gray-300 placeholder:text-gray-400 focus:ring-purple-800"
                    )}
                    role="combobox"
                    aria-controls="options"
                    aria-expanded={data ? "true" : "false"}
                    value={suggestionValue}
                    onChange={(e) => handleInput(e, isSubmitted)}
                    disabled={!ready}
                    placeholder={props.placeholder}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        clearSuggestions();
                      }
                    }}
                  />
                  {status === "OK" && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-purple-800 ring-opacity-5 focus:outline-none sm:text-sm">
                      {renderSuggestions()}
                    </ul>
                  )}
                  {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FontAwesomeIcon
                        className="h-5 w-5 text-red-500"
                        icon={faCircleXmark}
                      />
                    </div>
                  )}
                </div>
                {error && JSON.stringify(error)}

                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </>
            );
          }}
        ></Controller>
      ) : (
        <></>
      )}
    </>
  );
};
