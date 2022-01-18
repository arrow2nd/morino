/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { Component, h } from "../nano.ts";
import { Button } from "./button.tsx";
import { birth, calcSecond2Birthday, getNowJstDate } from "../lib/date.ts";

type Props = {
  siteUrl?: string;
};

export class CountDown extends Component {
  private siteUrl = "";
  private nowDate = getNowJstDate();
  private intervalId = 0;
  private second = 0;

  constructor(props: Props) {
    super(props);

    if (props.siteUrl) {
      this.siteUrl = props.siteUrl;
    }
  }

  private updateTime = () => {
    const nextDate = getNowJstDate();

    // 日付が変わったらリロード
    if (nextDate.getDate() !== this.nowDate.getDate()) {
      location.reload();
    }

    // 誕生日かどうか
    if (nextDate.getMonth() === birth.mon && nextDate.getDate() === birth.day) {
      // happyBirthDay();
      return;
    }

    // 更新
    this.second = calcSecond2Birthday(nextDate);
    this.nowDate = nextDate;
    this.update();
  };

  didMount() {
    // 1秒毎に更新
    this.intervalId = setInterval(this.updateTime, 1000);
    this.updateTime();
  }

  didUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const url = `${this.siteUrl}&t=${this.nowDate.getTime()}`;

    return (
      <div>
        <div class="countdown">
          <h1 class="title">杜野凛世さんのお誕生日まで</h1>
          <div class="time">
            残り<span class="seconds">{this.second}</span>秒
          </div>
        </div>
        <Button
          url={url}
          second={this.second}
        />
      </div>
    );
  }
}
