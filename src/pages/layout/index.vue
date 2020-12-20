<template src="./index.html"></template>
<script>
	import { container, aside, menu, submenu, menuItemGroup, menuItem, header, dropdown, dropdownMenu, dropdownItem, main, table, tableColumn } from 'element-ui';
	import { moduleA } from '@src/requests';
	export default {
		components: {
			elContainer: container,
			elAside: aside,
			elMenu: menu,
			elSubmenu: submenu,
			elMenuItemGroup: menuItemGroup,
			elMenuItem: menuItem,
			elHeader: header,
			elDropdown: dropdown,
			elDropdownMenu: dropdownMenu,
			elDropdownItem: dropdownItem,
			elMain: main,
			elTable: table,
			elTableColumn: tableColumn
		},
		name: 'layout',
		data () {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
		},
		async mounted() {
			let res = await moduleA.getInfo();
			console.log(res);
		}
	}
</script>
<style src="./index.scss" lang="scss" scope></style>