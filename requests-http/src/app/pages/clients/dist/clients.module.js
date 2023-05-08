"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var clients_component_1 = require("./clients/clients.component");
var clients_routing_module_1 = require("./clients-routing.module");
var cpf_pipe_1 = require("src/app/pipes/cpf.pipe");
var forms_1 = require("@angular/forms");
var ClientsModule = /** @class */ (function () {
    function ClientsModule() {
    }
    ClientsModule = __decorate([
        core_1.NgModule({
            declarations: [
                clients_component_1.ClientsComponent,
                cpf_pipe_1.CpfPipe
            ],
            imports: [
                common_1.CommonModule,
                clients_routing_module_1.ClientsRoutingModule,
                forms_1.FormsModule,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], ClientsModule);
    return ClientsModule;
}());
exports.ClientsModule = ClientsModule;
