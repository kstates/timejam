export const getTimeZones = Intl.supportedValuesOf('timeZone');
export const timeZoneOptions = getTimeZones.map((timeZone) => { return {label: timeZone, value: timeZone }});
