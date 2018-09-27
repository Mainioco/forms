import { Injectable, InjectionToken, Inject, Optional } from "@angular/core";
import { ILoadedValues } from "../interfaces/i-loaded-values";
import { IMapConfiguration } from "../interfaces";
import { LibraryLoggerService } from "./library-logger.service";

export const IMapConfigurationToken = new InjectionToken<IMapConfiguration>(
  "IMapConfiguration"
);

@Injectable({
  providedIn: "root"
})
export class FormDataMapperService {
  private _mapConfigurations: {
    type: string;
    configuration: IMapConfiguration;
  };

  constructor(
    private _log: LibraryLoggerService,
    @Optional()
    @Inject(IMapConfigurationToken)
    services: IMapConfiguration[]
  ) {
    if (services) services.forEach(s => this.addConfiguration(s.type, s));
  }

  public addConfiguration(
    type: string,
    configuration: IMapConfiguration,
    forceSet: boolean = false
  ) {
    this.registerConfiguration(type, configuration, forceSet);
  }

  public hasMapper(type: string): boolean {
    if (!type) return false;
    if (!this._mapConfigurations) return false;
    return this._mapConfigurations[type];
  }

  public getMapperModelIdentifier(type: string): string {
    if (!this.hasMapper(type)) {
      return "";
    }
    let conf: IMapConfiguration = this._mapConfigurations[type];
    return conf.mapToModelIdentifier;
  }

  public getMapperDefaultModel(type: string): Object {
    if (!this.hasMapper(type)) {
      return {};
    }
    let conf: IMapConfiguration = this._mapConfigurations[type];
    return conf.defaultModel || {};
  }
  public map(
    type: string,
    formId: string,
    loadedValues: ILoadedValues,
    currentValue: any
  ): any {
    let conf: IMapConfiguration = this._mapConfigurations[type];
    if (!conf) {
      this._log.error("No mapping configuration for type " + type);
      return false;
    }
    return conf.map(loadedValues, formId, currentValue);
  }

  private registerConfiguration(
    type: string,
    configuration: any,
    forceSet: boolean
  ) {
    if (!type) {
      this._log.error("Configuration mapper must have type set");
      return;
    }
    if (!this._mapConfigurations) {
      let insert: any = {};
      insert[type] = configuration;
      this._mapConfigurations = insert;
      return;
    }
    let exts = this._mapConfigurations[type];
    if (exts && !forceSet) {
      return;
    }
    this._mapConfigurations[type] = configuration;
  }
}
