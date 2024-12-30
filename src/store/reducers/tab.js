import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: {}
    },
    reducers: {
        collapseMenu:state => {
            state.isCollapse = !state.isCollapse;
        },
        selectMenuList: (state, {payload:val}) => {
            if (val.name !== 'home') {
                state.currentMenu = val;
                // 判断是否已经存在 
                const res = state.tabList.findIndex(item => item.name === val.name);
                if (res === -1) {
                    state.tabList.push(val);
                }
                
            } else if (val.name === 'home' && state.tabList.length === 1) {
                state.currentMenu = {};
            }
        },
        closeTab: (state, {payload:val}) => {
            let res = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(res,1)
        },
        setCurrentMenu: (state, {payload:val}) => {
            if(val.name === 'home'){
                state.currentMenu = {}
            } else {
                state.currentMenu = val
            }
        }
    }
})

export const { collapseMenu,selectMenuList,closeTab,setCurrentMenu } = tabSlice.actions;
export default tabSlice.reducer;