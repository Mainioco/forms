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
          link: "models",
          title: "Models & Interfaces",
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
        }
      ]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
