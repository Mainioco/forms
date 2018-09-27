import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector,
  ViewContainerRef,
  InjectionToken,
  Type,
  Optional
} from "@angular/core";
import { DynamicFormQuestionComponent } from "../shared-components/dynamic-form-question/dynamic-form-question.component";

export const ComponentFactoryResolverToken = new InjectionToken<{}>(
  "ComponentFactoryResolverToken"
);

@Injectable({
  providedIn: "root"
})
export class QuestionComponentFactoryService {
  factoryResolver: ComponentFactoryResolver;
  rootViewContainer: ViewContainerRef;
  constructor(
    @Inject(ComponentFactoryResolver) factoryResolver,
    @Optional()
    @Inject(ComponentFactoryResolverToken)
    private services: any
  ) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(
      this.services ? this.services : DynamicFormQuestionComponent
    );
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}
