import React from "react";
import { Watch } from "../interfaces/watch";

export function WatchStatus({ watched }: { watched: Watch }): JSX.Element {
    return (
        <div>
            <em>{watched.seen ? "Watched" : "Not yet watched"}</em>
        </div>
    );
}
