import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme, getThemeDisplayName } from '@/lib/context/ThemeContext';

const TabPillComponent = (props: { tabs: any, activeTab: any, onTabChange: any }) => {
    const theme = useTheme();
  


    const {tabs, activeTab, onTabChange} = props;

    return (
        <div className="flex items-center justify-center">
            <Tabs
                value={activeTab}
                onChange={(event, newValue) => onTabChange(newValue)}
                centered
                className="w-full"
                sx={{
                    borderRadius: '100px',
                    padding: '1px',
                    backgroundColor: theme.theme === 'dark'
                        ? '#364153'
                        : '#f3f4f6',
                    "& .MuiTabs-indicator": {
                        background: "transparent",
                        height: "20px",
                        borderRadius: "40px",
                        fontFamily:"var(font-family)"
                    },
                    "& .MuiTab-root": {
                        textTransform: "capitalize",
                        color: theme.theme === 'dark'
                            ?'oklch(70.7% 0.022 261.325)'
                            : '#2C2C2C',
                        "&.Mui-selected": {
                            WebkitBackgroundClip: "none",
                            WebkitTextFillColor: "white",
                            backgroundColor: "#c62676",
                            fontWeight: "bold",
                            borderRadius: "50px",
                            transition:"300"
                        },
                    },
                }}
            >
                {tabs.map((tab: any, index: number) => (
                    <Tab
                        key={index}
                        label={tab}
                        value={tab}
                        sx={{
                            // textTransform: 'none', // Prevent uppercase text
                            fontWeight: 'bold',
                            padding: 0,
                            height: "fit",
                            // borderRadius: '9999px', // Fully rounded corners for each tab
                            color: activeTab === tab ? '#fff' : '#000', // Active: white text, Inactive: black text
                            // background:
                            //     activeTab === tab
                            //         ? 'linear-gradient(45deg, #c62676, #e16026)' // Gradient background for active tab
                            //         : 'transparent', // No background for inactive tab
                            // transition: 'all 0.3s ease',
                            // '&:hover': {
                            //     background: activeTab === tab
                            //         ? 'linear-gradient(45deg, #c62676, #e16026)' // Maintain gradient for active on hover
                            //         : 'rgba(0, 0, 0, 0.1)', // Slight hover effect for inactive
                            // },
                        }}
                    />
                ))}
            </Tabs>
        </div>
    );
};

export default TabPillComponent;
