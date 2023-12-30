"use client"

import { useEffect, useState } from "react";

type FlifoObject = {
  flifo: Flifo;
};

type Flifo = {
  flightMapPath: string;
  flightDurationMinutes: number;
  timeRemainingToDestination: number;
};

function MyApp() {
  const [thing, setThing] = useState<FlifoObject|null>();
  const [error, setError] = useState<Error|null>(null);

  useEffect(() => {
    async function getThing() {
      try {
        // const data = await fetch("/api/getSession").then((x) => x.json());
        const res = await fetch("/api/getSession");
        console.log(res);
        if (Number(res.status) > 200) {
          // throw?
          setError(await res.json());
        } else {
          const data = await res.json();
          setThing(data);
        }
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          setError(e);
        }
      }
    }

    setInterval(getThing, 5000);
  }, []);

  function getFlightProgressStage(flifo: any) {
    let flightProgressStage = 1;

    if (flifo.timeRemainingToDestination && flifo.timeRemainingToDestination) {
      if (flifo.flightDurationMinutes) {
        const actualFlightTime =
          flifo.flightDurationMinutes - flifo.timeRemainingToDestination;
        let flightCompletionPercentage =
          actualFlightTime / flifo.flightDurationMinutes;

        if (flightCompletionPercentage < 0) {
          flightCompletionPercentage = 0;
        }

        // console.log('rem:' + flifo.timeRemainingToDestination + 'flightdur: ' + flifo.flightDurationMinutes);

        flightProgressStage = Math.ceil(flightCompletionPercentage * 100);
      }
    }

    return flightProgressStage;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!thing) {
    return <>Loading...</>;
  }

  return (
    <>
      {thing.flifo ? (
        <>
          <h1>{getFlightProgressStage(thing.flifo)}%</h1>
          <div>
            <div
              style={{ width: "100%", backgroundColor: "#ddd", height: "20px" }}
            >
              <div
                style={{
                  width: `${getFlightProgressStage(thing.flifo)}%`,
                  backgroundColor: "#bbb",
                  height: "20px",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", right: "0" }}>✈️</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>No Flifo :(</h1>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Flight path" src={`https://www.unitedwifi.com/${thing.flifo.flightMapPath}`} />
      <pre>{JSON.stringify(thing, null, 2)}</pre>
    </>
  );
}

export default MyApp;

// FlifoWidgetControllerImpl.prototype.getFlightProgressStage = function () {
//   var flifo = this.getFlifo();
//   var flightProgressStage = 1;
//   if (angular.isDefined(flifo) && angular.isObject(flifo)) {
//       if (angular.isDefined(flifo.timeRemainingToDestination) && angular.isNumber(flifo.timeRemainingToDestination)) {
//           if (angular.isDefined(flifo.flightDurationMinutes) && angular.isNumber(flifo.flightDurationMinutes)) {
//               var actualFlightTime = flifo.flightDurationMinutes - flifo.timeRemainingToDestination;
//               var flightCompletionPercentage = actualFlightTime / flifo.flightDurationMinutes;
//               if (flightCompletionPercentage < 0) {
//                   flightCompletionPercentage = 0;
//               }
//               //console.log('rem:' + flifo.timeRemainingToDestination + 'flightdur: ' + flifo.flightDurationMinutes);
//               flightProgressStage = Math.ceil(flightCompletionPercentage / this.progressStageStep);
//           }
//       }
//   }
//   return flightProgressStage;
// };


// export default function Home() {
//   return (
//     <>This Is Probably Where The Magic Happens</>
//   )
// }
