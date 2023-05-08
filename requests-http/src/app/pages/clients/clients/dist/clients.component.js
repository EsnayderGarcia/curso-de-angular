"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientsComponent = void 0;
var core_1 = require("@angular/core");
var ClientsComponent = /** @class */ (function () {
    function ClientsComponent(clientService, spinner) {
        this.clientService = clientService;
        this.spinner = spinner;
        this.errorServerMessage = '';
        this.size = { name: 'size', value: null };
        this.page = { name: 'page', value: null };
        this.queryParameters = [this.size, this.page];
    }
    ClientsComponent.prototype.ngOnInit = function () {
        this.popularListaClients();
    };
    ClientsComponent.prototype.popularListaClients = function () {
        var _this = this;
        this.clients = [];
        this.spinner.show();
        this.clientService
            .buscarClientesPaginados(this.queryParameters)
            .subscribe(function (response) {
            _this.clients = response.content;
            _this.spinner.hide();
        });
    };
    ClientsComponent = __decorate([
        core_1.Component({
            selector: 'app-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.scss']
        })
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;
