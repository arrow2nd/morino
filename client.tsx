/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, hydrate } from "./nano.ts";
import { CountDown } from "./components/countdown.tsx";

const start = () => {
  hydrate(<CountDown />, document.getElementById("countdown"));
};

self.addEventListener("load", () => {
  start();
});
