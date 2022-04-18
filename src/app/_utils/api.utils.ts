import {BehaviorSubject, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppModule} from "../app.module";
import {BaseApiInterface} from "./base-api.utils";


export class ObjectApiService {
  /*
   */
  objectBehaviorSubject = new BehaviorSubject<any | null>(null);
  public keyId = 'id';
  paginate = false;
  resultKey = 'results'
  nextPageKey = 'next'
  previousPageKey = 'next'
  nextPageUrl = new BehaviorSubject<string|null>(null)
  matSnackBar: MatSnackBar
  successPostNotification: string | null = null
  successPatchNotification: string | null = null
  successDeleteNotification: string | null = null
  successGetNotification: string | null = null
  failPostNotification: string | null = null
  failPatchNotification: string | null = null
  failDeleteNotification: string | null = null
  failGetNotification: string | null = null

  constructor(protected api: BaseApiInterface) {
    this.listObject();
    const injector = AppModule.InjectorInstance
    this.matSnackBar = injector.get(MatSnackBar)
  }

  public listObject(queryParam: any = null): void {
    this.api.getObject(null, queryParam)
      .subscribe(
        x => {
          let data = x;
          if (this.paginate) {
            data = this.setPaginationData(x);
          }
          this.onSuccessListObject(data);
          },
        error => {
          this.onFailListObject(error);
        });
  }
  public listNextOrPreviousPage(previous = true) {
    const url = !previous && this.nextPageUrl.value ? this.nextPageUrl.value : null
    if (url) {
    this.api.getObject(null, {}, url)
      .subscribe(
        x => {

          let data = x;
          if (this.paginate) {
            data = this.setPaginationData(x);
          }
          this.onSuccessListObject(data);
          },
        error => {
          this.onFailListObject(error);
      });
    }
  }
  setPaginationData(results: any): any {
    let data = null
    if (Object.keys(results).indexOf(this.resultKey) > -1) {
      data = results[this.resultKey]
    }
    if (Object.keys(results).indexOf(this.nextPageKey) > -1) {
      this.nextPageUrl.next(results[this.nextPageKey]);
    }
    return data;
  }

  public getObject(objectId: number, queryParam: any = null): void {
      this.api.getObject(objectId, queryParam).subscribe(
        x => {
            this.onSuccessGetObject(objectId, x, queryParam);
        },
        error => {
          this.onFailGetObject(error);
        }
      );
  }

  public createObject(objectData: Object, ...args: any): Subject<boolean|unknown>  {
    const subject = new Subject()
    this.api.createObject(objectData).subscribe(
      returnedObject => {
        this.onSuccessCreateObject(returnedObject, subject, ...args);

      },
      error => {
        this.onFailCreateObject(error, subject, ...args);
      }
    );
    return subject;
  }

  public deleteObject(objectId: number): void {
    this.api.deleteObject(objectId).subscribe(
      returnedObject => {
        this.onSuccessDeleteObject(returnedObject, objectId);
      },
      error => {
        this.onFailDeleteObject(error);
      }
    );
  }

  public patchObject(objectId: number, objectData: Object, ...args: unknown[]): Subject<boolean|unknown> {
    const subject = new Subject()
    this.api.patchObject(objectId, objectData).subscribe(
      returnedObject => {
        this.onSuccessPatchObject(returnedObject, objectData, objectId, subject);
      },
      error => {
        this.onFailPatchObject(error, subject);
      }
    );
    return subject;
  }

  public onFailCreateObject(error: any, subject: Subject<any>, ...args: any): void {
    subject.next(false);
    if (this.failPostNotification) {
      this.matSnackBar.open(this.failPostNotification, '', {duration: 2000})
    }

  }
  public onFailGetObject(error: any): void {}
  public onFailPatchObject(error: any, check: Subject<any>): void {
    check.next(false)
  }
  public onFailListObject(error: any): void {}
  public onFailDeleteObject(error: any): void {}

  public onSuccessGetObject(objectId: number, returnedObject: object, ...args: any): void {
    this.addOrUpdateItem(returnedObject, objectId);
    this.objectBehaviorSubject.next(this.objectBehaviorSubject.getValue())
  }
  public onSuccessListObject(returnedObjects: any, ...args: any): void {
    for (const returnedObject of returnedObjects) {
      this.addOrUpdateItem(returnedObject, returnedObject[this.keyId])
    }
    this.objectBehaviorSubject.next(this.objectBehaviorSubject.getValue())
  }
  public onSuccessPatchObject(returnedObject: object, objectData: object,
                              objectId: number, check: Subject<any>): void {
    this.addOrUpdateItem(returnedObject, objectId)
    check.next(true)
    if (this.successPatchNotification) {
        this.matSnackBar.open(this.successPatchNotification, '', {duration: 2000})
    }
  }
  public onSuccessDeleteObject(returnedObject: object, objectId: number): void {
    this.removeItem(objectId);
    if (this.successDeleteNotification) {
        this.matSnackBar.open(this.successDeleteNotification, '', {duration: 2000})
    }
  }
  public onSuccessCreateObject(returnedObject: any, subject: Subject<any>, ...args: any): void {
      this.addOrUpdateItem(returnedObject, returnedObject[this.keyId]);
      this.objectBehaviorSubject.next(this.objectBehaviorSubject.getValue())
      subject.next(true)
      if (this.successPostNotification) {
        this.matSnackBar.open(this.successPostNotification, '', {duration: 2000})
      }
  }

  private removeItem(objectId: number): void {
    if (this.objectBehaviorSubject.value === null) {
      return
    }
    let count = 0;
    for (const element of this.objectBehaviorSubject.value) {
      if (element[this.keyId] === objectId) {
        const objectList = [...this.objectBehaviorSubject.value];
        objectList.splice(count, 1);
        this.objectBehaviorSubject.next(objectList);
      }
      count += 1;
    }
  }
  public addOrUpdateItem(newObject: object, objectId ?: number): void {
    /*
    * Ajoute un item à une liste
    * Si une clé pour l'item a été fournie et qu'elle est deja présente
    * dans la liste, l'item est mis a jour et non ajouté
    * */

    const values: object[] | null = this.objectBehaviorSubject.value;
    let newValues: any[] = [];
    if (values) {
      if (objectId !== undefined && objectId !== null) {
        const itemIndex = this.findObjectIndex(objectId);
        if (itemIndex !== null) {
          this.updateItem(newObject, itemIndex);
          this.objectBehaviorSubject.next(this.objectBehaviorSubject.getValue())
          return;
        }
      }
      this.objectBehaviorSubject.value?.push(newObject)
      return;
    } else {
      newValues = [newObject];
      this.objectBehaviorSubject.next(newValues);
    }
  }
  public findObjectIndex(itemId: number | string): number | null {
    if (this.objectBehaviorSubject.value === null) {
      return null;
    }
    const objectList = this.objectBehaviorSubject.value;
    let index = 0;
    for (const element of objectList) {
      if (element[this.keyId] === itemId) {
        return index;
      }
      index += 1;
    }
    return null;
  }
  private updateItem(item: any, itemIndex: number): void {
    if (this.objectBehaviorSubject.value === null) {
      return;
    }
    for (const key of Object.keys(item)) {
        this.objectBehaviorSubject.value[itemIndex][key] = item[key];
    }
  }
  public getItemById(id: any): any {
    const values = this.objectBehaviorSubject.getValue()
    if (values) {
      for (const element of values) {
        if (element[this.keyId].toString() === id.toString()) {
          return element
        }
      }
    }

  }

}
