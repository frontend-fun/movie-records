import type { Watch } from "../interfaces/watch";

export function WatchStatus({ watched }: { watched: Watch }) {
    return (
        <div>
            <em>{watched.seen ? "Watched" : "Not yet watched"}</em>
        </div>
    );
}
