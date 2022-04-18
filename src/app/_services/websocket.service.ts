import { Injectable } from "@angular/core";
import {Observable, Observer, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() {
  }

  private subject: Subject<MessageEvent> | undefined;

  public connect(url: string) {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject.pipe(map(
      x => {
        return JSON.parse(x.data).message
      }
    ));
  }

  private create(url: string): Subject<any> {
    let ws = new WebSocket(url);
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
