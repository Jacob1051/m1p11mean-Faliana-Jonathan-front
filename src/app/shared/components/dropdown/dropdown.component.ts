import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/multi-dropdown';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {

    _items: Item[] = [];

    @Input() placeholder: string | undefined;
    @Input() showSearch = true;
    @Input() showStatus = true;
    @Input() showError = false;
    @Input() noItemLabel = 'Pas de donneé.';
    @Output() itemChange = new EventEmitter<Item>(undefined);

    @Input('items')
    set items(items: Item[]) {
        var selected = items.find( (element: any) => ( element.checked == true ));

        this._items = items;
        this._items.map(item => {
            item.visible = item.visible || true;
        });
        this.filtered = [...this._items];

        if(selected){
            this.item = selected;
        }
    }

    filtered: Item[] = [];
    item!: Item;

    private searchText = '';

    get search(): string {
        return this.searchText;
    }

    set search(searchText: string) {
        this.searchText = searchText;

        const search = this.searchText.toLowerCase();
        if (!search) {
            this.filtered = [...this._items];
            return;
        }
        this.filtered = this._items.filter(i => i.name.toLowerCase().indexOf(search) !== -1);
    }

    get isEmpty(): boolean {
        return this.filtered.filter(i => i.visible).length === 0;
    }

    trackById(item: Item) {
        return item.id;
    }

    onChange(item: Item): void {
        this.item = item;
        this.itemChange.emit(item);
    }
}
