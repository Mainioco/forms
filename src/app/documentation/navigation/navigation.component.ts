import { Component, OnInit } from "@angular/core";

interface NavItem {
  link: string;
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
      link: "getting-started",
      title: "Getting started"
    },
    {
      link: "examples",
      title: "Examples"
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
            }
          ]
        }
      ]
    }
  ];
  constructor() {}

  ngOnInit() {}
}
