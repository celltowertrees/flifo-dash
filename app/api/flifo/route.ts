export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const thingResponse = await fetch(
      "https://www.unitedwifi.com/portal/r/getAllSessionData"
    );
    const thing = await thingResponse.json();
    return Response.json(thing);
  } catch (e) {
    return Response.json({
      message: "You must not be connected to the internet or something",
    });
  }
}
