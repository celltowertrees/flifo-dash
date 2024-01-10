export const dynamic = "force-dynamic";
import data from "./data.json";

export async function GET() {
  try {
    const thingResponse = await fetch(
      "https://www.unitedwifi.com/portal/r/getAllSessionData"
    );
    const thing = await thingResponse.json();
    return Response.json(thing);
  } catch (e) {
    console.error(e);
    console.log("Providing fallback response");
    return Response.json(data);
  }
}
