import { Component, OnInit } from "@angular/core";

interface NavItem {
  link?: string;
  title: string;
  children?: NavItem[];
}
@Component({
  selector: "mainio-form-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  items: NavItem[] = [
    {
      link: "getting-started?p=intro",
      title: "Getting started",
      children: [
        {
          link: "?p=examples",
          title: "Examples"
        },
        {
          link: "?p=advanced",
          title: "Advanced getting started"
        }
      ]
    },
    {
      link: "api",
      title: "API",
      children: [
        {
          link: "components",
          title: "Components",
          children: [
            {
              link: "dynamic-form",
              title: "DynamicForm (no store)"
            },
            {
              link: "dynamic-store-form",
              title: "DynamicStoreForm (NgRx Store)"
            },
            {
              title: "Internal Components"
            },
            {
              link: "form-question",
              title: "FormQuestionContainer"
            }
          ]
        },
        {
          link: "services",
          title: "Services",
          children: [
            {
              link: "?p=data-mapper",
              title: "Data Mapper"
            },
            {
              link: "?p=form-group",
              title: "DynamicStoreForm (NgRx Store)"
            },
            {
              link: "?p=library-logger",
              title: "Logger"
            },
            {
              link: "?p=question-control",
              title: "Form Field"
            },
            {
              link: "?p=question-creator",
              title: "Question Creator"
            },
            {
              link: "?p=display-validator",
              title: "Question Display Validator"
            },
            {
              link: "?p=question-group",
              title: "Question Group"
            },
            {
              link: "?p=json-parser",
              title: "JSON Parser"
            },
            {
              link: "?p=validation-message",
              title: "Validation Message"
            }
          ]
        },
        {
          link: "form-fields",
          title: "Form fields",
          children: [
            {
              link: "?p=input",
              title: "Basic input"
            },
            {
              link: "?p=dropdown",
              title: "Dropdown"
            },
            {
              title: "Number Input",
              link: "?p=number-input"
            },
            {
              title: "Repeat Input",
              link: "?p=repeat-input"
            },
            {
              title: "Slider",
              link: "?p=slider"
            },
            {
              title: "Date",
              link: "?p=date"
            }
          ]
        },
        {
          link: "interfaces",
          title: "Interfaces",
          children: [
            {
              link: "?p=question-base",
              title: "IQuestionBaseOptions"
            },
            {
              link: "?p=display-group",
              title: "IDisplayGroup"
            },
            {
              link: "?p=form-changes",
              title: "IFormChanges"
            },
            {
              title: "IFormGroupCreator",
              link: "?p=form-group-creator"
            },
            {
              title: "IJSonParser",
              link: "?p=json-parser"
            },
            {
              title: "IMapConfiguration",
              link: "?p=map-configuration"
            },
            {
              link: "?p=option-group",
              title: "IOptionGroup"
            },
            {
              link: "?p=question-change",
              title: "IQuestionChage"
            },
            {
              link: "?p=validation-message",
              title: "IValidationMessage"
            },
            {
              link: "?p=validation-messages",
              title: "IValidationMessages"
            }
          ]
        }
      ]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
