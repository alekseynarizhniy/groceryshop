import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CardComponent } from './card/card.component';
import { SelectSortComponent } from './select-sort/select-sort.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { BucketComponent } from './bucket/bucket.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DialogSignInComponent } from './dialog-sign-in/dialog-sign-in.component';
import { DialogBucketComponent } from './dialog-bucket/dialog-bucket.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessOrderComponent } from './success-order/success-order.component';
import { RegistrComponent } from './registr/registr.component';
import { RegistrDialogComponent } from './registr-dialog/registr-dialog.component';
import { ProfComponent } from './prof/prof.component';
import { ProfDialogComponent } from './prof-dialog/prof-dialog.component';
import { FormRegistrationPartComponent } from './form-registration-part/form-registration-part.component';

import { CurrencyPipe } from '../pipes/currency.pipe';
import { FirstToUppercase } from '../pipes/first-to-uppercase.pipe';

import { bucket } from '../reducers/bucket.reducer';

import { HightlightShadowDirective } from '../directives/hightlightshadow.directive';
import { DialogProductDirective } from '../directives/dialog-product.directive';

import { FilterProductService } from '../services/filter-product.service';
import { SortProductService } from '../services/sort-product.service';
import { UserService } from '../services/user.service';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  { path: '**', component: MainComponent },
];

@NgModule({
  declarations: [
    CardComponent,
    SelectSortComponent,
    MainComponent,
    HeaderComponent,
    BucketComponent,
    DialogBucketComponent,
    CurrencyPipe,
    FirstToUppercase,
    HightlightShadowDirective,
    DialogProductComponent,
    DialogProductDirective,
    SignInComponent,
    DialogSignInComponent,
    FormRegistrationComponent,
    SignOutComponent,
    SearchComponent,
    SuccessOrderComponent,
    FooterComponent,
    RegistrComponent,
    RegistrDialogComponent,
    ProfComponent,
    ProfDialogComponent,
    FormRegistrationPartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forRoot<any, any>({ addGoods: bucket }),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule, HeaderComponent, FooterComponent],
  providers: [FilterProductService, SortProductService, UserService],
  bootstrap: [],
})
export class ComponentModule {}
