export const groupForecastByDay = (forecastList, limit = 5) =>
  Object.values(
    forecastList.reduce((days, item) => {
      const date = item.dt_txt.split(" ")[0];
      const day = days[date] ?? { items: [], representative: item };
      day.items.push(item);

      const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
      const representativeHour = Number(
        day.representative.dt_txt.split(" ")[1].slice(0, 2),
      );

      if (Math.abs(hour - 12) < Math.abs(representativeHour - 12)) {
        day.representative = item;
      }

      days[date] = day;
      return days;
    }, {}),
  )
    .slice(0, limit)
    .map(({ items, representative }) => ({
      ...representative,
      minTemperature: Math.min(...items.map((item) => item.main.temp)),
      maxTemperature: Math.max(...items.map((item) => item.main.temp)),
    }));
