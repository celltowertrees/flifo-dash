export default async function getThing(_req, res) {
  res.status(200).json({
    message: "this should return 200 no matter what",
  });
  // try {
  //   const thingResponse = await fetch(
  //     "https://www.unitedwifi.com/portal/r/getAllSessionData"
  //   );
  //   const thing = await thingResponse.json();
  //   res.status(200).json(thing);
  // } catch (e) {
  //   res.status(500).json({
  //     message: "You must not be connected to the internet or something",
  //   });
  // }
}
