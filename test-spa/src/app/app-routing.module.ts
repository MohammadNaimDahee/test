import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TeachersComponent } from "./components/teachers/teachers.component";
import { CoursesComponent } from "./screens/courses/courses.component";
import { HomeComponent } from "./screens/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "courses",
    component: CoursesComponent,
  },
  {
    path: "teachers",
    component: TeachersComponent,
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
