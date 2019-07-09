<template>
    <v-container page>
        <v-layout row wrap>
            <v-flex xs12>
                <h1 class="page__caption">Table UI</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!products && !errors">
            <v-flex xs12>
                <loader />
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!products && errors">
            <v-flex xs12>
                <h1>{{ errors.error }}</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap page__filters align-center v-if="products">
            <v-flex page__filters-groups>
                <strong class="mr-1">Sort By:</strong>
                <span
                    v-for="(group, idx) in groups"
                    :key="`group_${idx}`"
                    :class="{ 'page__filters-groups-control': true, 'page__filters-groups-control--active': pagination.sortBy === group.value }"
                    @click="setGroup(group.value)"
                >{{ group.text }}</span>
            </v-flex>
            <v-flex>
                <v-layout row wrap justify-end align-center>
                    <v-flex shrink>
                        <button
                            :class="{ 'btn': true, 'btn--ghost': !selectedItems.length }"
                            @click="deleteProductsGroup"
                            :disabled="!selectedItems.length"
                        >{{ selectedItems.length ? `Delete (${selectedItems.length})` : "Delete"}}</button>
                    </v-flex>
                    <v-flex shrink products__table-pagination-select>
                        <v-select
                            v-model="pagination.rowsPerPage"
                            :items="rowsPerPage"
                            item-text="name"
                            offset-y
                            hide-details
                        ></v-select>
                    </v-flex>
                    <v-flex shrink>
                        <button
                            :class="{ 'products__table-pagination': true, 'products__table-pagination--left': true, 'products__table-pagination--disabled': pagination.page === 1 }"
                            @click="prevPage"
                            :disabled="pagination.page === 1"
                        ></button>
                        <strong
                            class="products__table-pagination-text"
                        >{{ getPaginationPosition() }}</strong>
                        <button
                            :class="{ 'products__table-pagination': true, 'products__table-pagination--right': true, 'products__table-pagination--disabled': pagination.page === 10 }"
                            @click="nextPage"
                        ></button>
                    </v-flex>
                    <v-flex shrink products__table-pagination-select>
                        <v-select
                            v-model="columnsSelected"
                            :items="groups"
                            item-disabled="disabledColumn"
                            return-object
                            multiple
                            offset-y
                        >
                            <template v-slot:prepend-item>
                                <v-list-tile ripple @click="selectAllColumns">
                                    <v-list-tile-action>
                                        <div
                                            class="v-input--selection-controls__ripple primary--text select-all"
                                        ></div>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Select All</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                            <template v-slot:selection="{ item, index }">
                                <strong
                                    v-if="index === 0"
                                >{{ columnsSelected.length }} Columns Selected</strong>
                            </template>
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap products v-if="products">
            <v-flex xs12>
                <v-data-table
                    v-model="selectedItems"
                    :headers="headers"
                    :items="products"
                    :pagination.sync="pagination"
                    class="products__table"
                    hide-actions
                    select-all
                >
                    <template v-slot:items="props">
                        <td class="products__table-check">
                            <span class="products__table-line"></span>
                            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                        </td>
                        <td>{{ props.item.product }}</td>
                        <td v-if="getColumnDisplay('calories')">{{ props.item.calories }}</td>
                        <td v-if="getColumnDisplay('fat')">{{ props.item.fat }}</td>
                        <td v-if="getColumnDisplay('carbs')">{{ props.item.carbs }}</td>
                        <td v-if="getColumnDisplay('protein')">{{ props.item.protein }}</td>
                        <td v-if="getColumnDisplay('iron')">{{ props.item.iron }}</td>
                        <td class="products__table-actions">
                            <v-menu :close-on-content-click="false" lazy right offset-x>
                                <div
                                    slot="activator"
                                    @click="openConfirm"
                                    class="products__table-actions-trigger"
                                >
                                    <v-icon color="error">delete</v-icon>Delete
                                </div>
                                <div class="products__table-actions-confirm">
                                    <loader absolute v-if="doSomething" />
                                    <div :class="{hide: doSomething}">
                                        <div class="products__table-actions-title">
                                            Are you sure you want to
                                            <strong>delete {{ props.item.product }}</strong>?
                                        </div>
                                        <div class="products__table-actions-buttons">
                                            <span
                                                class="products__table-actions-message"
                                                v-if="errors"
                                            >
                                                {{ errors.error }}.
                                                <br />Please, try again later.
                                            </span>
                                            <button class="btn btn--ghost">Cancel</button>
                                            <button
                                                class="btn"
                                                @click="deleteProduct(props.item)"
                                            >Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </v-menu>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { emulateGetRequest, emulateDeleteRequest } from "@/API";
import Loader from "@/components/Loader";

export default {
    name: "Page",
    data: () => ({
        errors: null,
        doSomething: false,
        products: null,
        pagination: {
            rowsPerPage: 10,
            page: 1,
            sortBy: "product"
        },
        selectedItems: [],
        columnsSelected: [],
        groups: [
            {
                text: "Dessert (100g serving)",
                value: "product",
                disabledColumn: true
            },
            { text: "Calories", value: "calories", disabledColumn: false },
            { text: "Fat (g)", value: "fat", disabledColumn: false },
            { text: "Carbs (g)", value: "carbs", disabledColumn: false },
            { text: "Protein (g)", value: "protein", disabledColumn: false },
            { text: "Iron (%)", value: "iron", disabledColumn: false }
        ],
        rowsPerPage: [
            { value: 10, name: "10 Per Page" },
            { value: 20, name: "20 Per Page" },
            { value: 30, name: "30 Per Page" },
            { value: 40, name: "40 Per Page" },
            { value: 50, name: "50 Per Page" }
        ]
    }),
    methods: {
        getProducts() {
            emulateGetRequest()
                .then(response => {
                    this.products = response;
                })
                .catch(error => (this.errors = error));
        },
        setGroup(group) {
            this.pagination.sortBy = group;
        },
        deleteProduct(product) {
            this.doSomething = true;
            const index = this.products.indexOf(product);

            emulateDeleteRequest()
                .then(response => {
                    if (response.message === "deleted") {
                        this.products.splice(index, 1);
                        this.doSomething = false;
                    }
                })
                .catch(error => {
                    this.errors = error;
                    this.doSomething = false;
                });
            //this.doSomething = false;
        },
        deleteProductsGroup() {
            if (!this.selectedItems.length) {
                return true;
            } else {
                setInterval(() => {
                    this.selectedItems.map(product => {
                        this.deleteProduct(product);
                    });
                }, 2000);
            }
        },
        prevPage() {
            if (this.pagination.page === 1) return false;
            --this.pagination.page;
        },
        nextPage() {
            ++this.pagination.page;
        },
        getPaginationPosition() {
            if (!this.products && !this.products.length) return "";
            const total = this.products.length;
            const { rowsPerPage, page } = this.pagination;
            const from = rowsPerPage * (page - 1) + 1;
            const to = rowsPerPage * page;
            return `${from}-${to} of ${total}`;
        },
        getColumns() {
            this.groups.map(column => {
                this.columnsSelected.push(column);
            });
        },
        selectAllColumns() {
            const total = this.groups.length;

            this.$nextTick(() => {
                if (this.columnsSelected.length === total) {
                    this.columnsSelected = ["product"];
                } else {
                    this.columnsSelected = this.groups.slice();
                }
            });
        },
        getColumnDisplay(key) {
            const columns = this.columnsSelected.map(
                column => column.value === key
            );
            return columns.indexOf(true) + 1;
        },
        openConfirm() {
            this.errors = null;
            this.doSomething = false;
        }
    },
    computed: {
        headers() {
            const actions = { text: "", value: "", sortable: false };
            return this.columnsSelected.concat(actions);
        }
    },
    components: { Loader },
    mounted() {
        this.getColumns();
        this.getProducts();
    }
};
</script>
<style lang="scss">
button,
button:hover,
button:focus {
    outline: none;
}
.hide {
    opacity: 0;
}
.page {
    min-height: 700px;
    &__caption {
        padding: 5px 0 10px;
        font-size: 32px;
        font-weight: 400;
        border-bottom: 1px solid #ededed;
    }

    &__filters {
        font-size: 13px;
        letter-spacing: 0.01em;
        padding: 16px 0;

        .btn {
            margin: 0 10px 0 0;
        }
        &-groups {
            &-control {
                background: rgba(0, 0, 0, 0);
                padding: 4px 5px;
                margin: 0 3px;
                border-radius: 4px;
                cursor: pointer;

                &--active {
                    background: #4b74ff;
                    color: #fff;
                }
            }
        }
        .v-select__selections {
            strong {
                font-size: 13px;
                font-weight: 400;
                padding-left: 10px;
            }
            input {
                width: 5px;
                padding: 5px 0;
            }
        }
        .v-select__selection {
            font-size: 13px;
            margin: 6px 0 6px 10px;
            white-space: nowrap;
        }
        .v-text-field {
            padding: 0;
            margin: 0;
        }
        .v-input__control {
            border: 1px solid #aaa;
            border-radius: 2px;
            margin-top: 1px;
            height: 31px;
        }
        .v-input__icon {
            .v-icon {
                font-size: 0;
                display: block;
                height: 6px;
                width: 6px;
                transform: rotate(45deg);
                border: 1px solid #666;
                border-width: 0 2px 2px 0;

                &.primary--text {
                    transform: rotate(225deg);
                }
            }
        }
        .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
            display: none;
        }
    }
}
.products {
    .theme--light.v-table tbody tr:not(:last-child) {
        border: 0;
    }
    &__table {
        thead tr:hover {
            background: #fff !important;
        }
        tr {
            background: #fff !important;

            &[active] {
                background: #fff !important;
            }
            position: relative;
            &:hover {
                background: rgba(74, 116, 252, 0.1) !important;

                .products__table-line {
                    opacity: 1;
                }
                .products__table-actions {
                    opacity: 1;
                }
            }
            td:nth-child(1),
            th:nth-child(1) {
                padding: 0 0 0 32px !important;
                position: relative;

                .v-icon {
                    color: transparent !important;
                }
                .v-input--selection-controls__ripple {
                    display: inline-block;
                    vertical-align: middle;
                    color: transparent;
                    border: 1px solid #ccc;
                    height: 14px;
                    width: 14px;
                    border-radius: 0;
                    top: -2px;
                    left: -2px;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 1px;
                        right: 1px;
                        bottom: 1px;
                        left: 1px;
                        background: #4b74ff;
                        opacity: 0;
                    }

                    &.accent--text {
                        &::after {
                            opacity: 1;
                        }
                    }
                }
            }
            td:nth-child(2),
            th:nth-child(2) {
                padding-left: 0 !important;
            }

            th {
                font-size: 14px !important;
                &.active {
                    color: #4b74ff !important;
                }
            }
            &:nth-child(2n + 2),
            &[active]:nth-child(2n + 2) {
                background: #f5f5f5 !important;
            }
        }
        &-actions {
            opacity: 0;
            font-size: 14px !important;
            padding-right: 32px !important;
            text-align: right;

            &-trigger {
                color: #ff0000;
                cursor: pointer;

                .v-icon {
                    font-size: 16px;
                    margin-right: 2px;
                }
            }
            &-confirm {
                padding: 20px 24px;
                border-radius: 4px;
                background: #fff;
                text-align: right;
                width: 370px;
            }
            &-title {
                text-align: center;
                padding-bottom: 16px;
            }
            &-message {
                float: left;
                max-width: 40%;
                font-size: 12px;
                color: #ff0000;
                text-align: left;
            }
        }

        &-pagination {
            display: inline-block;
            vertical-align: top;
            text-align: center;
            height: 32px;
            width: 32px;
            border-radius: 2px;
            border: 1px solid #aaa;
            margin: 0 10px;
            cursor: pointer;

            &::after {
                content: "";
                display: inline-block;
                vertical-align: top;
                border: 1px solid #666;
                border-width: 1px 1px 0 0;
                height: 6px;
                width: 6px;
                margin-top: 7px;
                position: relative;
            }
            &--left {
                &::after {
                    transform: rotate(-135deg);
                    right: -1px;
                }
            }
            &--right {
                &::after {
                    transform: rotate(45deg);
                    left: -1px;
                }
            }
            &--disabled {
                border-color: #eee;
                cursor: no-drop;

                &::after {
                    border-color: #eee;
                }
            }
            &-text {
                display: inline-block;
                vertical-align: top;
                margin-top: 5px;
                min-width: 100px;
                text-align: center;
            }

            &-select {
                min-width: 20px;
            }
        }
        &-line {
            width: 3px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: #4b74ff;
            opacity: 0;
        }
    }
}
.btn {
    display: inline-block;
    vertical-align: top;
    border: 1px solid #ff0000;
    background: #ff0000;
    padding: 5px 15px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 10px;

    &--ghost {
        background: none;
        border-color: #ccc;
        color: #aaa;
    }
}
.theme--light.v-table {
    background: rgba(255, 255, 255, 0.7) !important;
}
.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
    display: none;
}

.v-input--selection-controls__input {
    .v-icon {
        color: transparent !important;
    }
}
.v-input--selection-controls__ripple {
    display: inline-block;
    vertical-align: middle;
    color: transparent;
    border: 1px solid #ccc;
    height: 14px;
    width: 14px;
    border-radius: 0;
    top: -2px;
    left: -2px;

    &::after {
        content: "";
        position: absolute;
        top: 1px;
        right: 1px;
        bottom: 1px;
        left: 1px;
        background: #4b74ff;
        opacity: 0;
    }

    &.accent--text,
    &.primary--text {
        &::after {
            opacity: 1;
        }
    }
}
.v-list__tile__action {
    min-width: 32px;
    position: relative;
}
.v-list__tile {
    height: 40px;
}
.v-list__tile__title {
    line-height: 16px;
    height: 16px;
}
.select-all {
    top: 5px;
}
.v-text-field .v-input__append-inner {
    padding: 0;
    margin: 2px 0 0;
}
.v-list--disabled {
    opacity: 0.6;
}
</style>


