import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { DownloadComponent } from './download/download.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PreviewComponent } from './preview/preview.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

const appRoutes: Routes = [{
  path: '',
  component: UserListComponent,
},
{
  path: 'user/create',
  component: UserComponent
},
{
  path: 'preview',
  component: PreviewComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    UserComponent,
    DownloadComponent,
    UserListComponent,
    UserDetailsComponent,
    PreviewComponent,
    PdfPreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    PdfViewerModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
