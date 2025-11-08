import React from "react";
import { render, screen } from "@testing-library/react";
import { WatchStatus } from "../src/components/WatchStatus";

describe("WatchStatus test cases", () => {
    const seenWatchStatus = {
        seen: false,
        liked: false,
        when: null,
    };
    it("Renders the watch status", () => {
        render(<WatchStatus watched={seenWatchStatus}></WatchStatus>);
    });
    it("Renders the watch status", () => {
        render(<WatchStatus watched={seenWatchStatus}></WatchStatus>);
        const watchedText = screen.getByText(/Watched/i);
        expect(watchedText).toBeInTheDocument();
    });
    it("Renders the watch status", () => {
        render(
            <WatchStatus
                watched={{
                    seen: false,
                    liked: false,
                    when: null,
                }}
            ></WatchStatus>,
        );
        const watchedText = screen.getByText(/Not yet watched/i);
        expect(watchedText).toBeInTheDocument();
    });
});
