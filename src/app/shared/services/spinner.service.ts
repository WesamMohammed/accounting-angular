import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {



private loaderRef: any = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createLoaderComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      SpinnerComponent
    );
    this.loaderRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.loaderRef.hostView);
    document.body.appendChild(
      (this.loaderRef.hostView as EmbeddedViewRef<any>).rootNodes[0]
    );
  }

  showSpinner() {
    if (!this.loaderRef) {
      this.createLoaderComponent();
    }
  }

  hideSpinner() {
    if (this.loaderRef) {
      this.appRef.detachView(this.loaderRef.hostView);
      this.loaderRef.destroy();
      this.loaderRef = null;
    }
  }
}
