import {NgModule} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {MatIconRegistry} from "@angular/material/icon";

const ICONS = [
  'bin',
  // 'file'
];

@NgModule({
    providers: [
        MatIconRegistry,
        HttpClientModule,
    ],
    exports: [
        HttpClientModule,
    ]
})
export class AsbAppIconsModule {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        for (const icon of ICONS) {
            iconRegistry.addSvgIcon(
                icon,
                sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
            );
        }
    }
}
