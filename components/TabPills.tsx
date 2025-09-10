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
                    padding: '7px',
                    backgroundColor: theme.theme === 'dark'
                        ? '#333333'
                        : '#E5E5E5',
                        
                    "& .MuiTabs-indicator": {
                        background: "transparent",
                        height: "20px",
                        borderRadius: "40px",
                   
            
                    },
                    "& .MuiTab-root": {
                        textTransform: "capitalize",
                         fontFamily:"var(--font-family)",
                        color: theme.theme === 'dark'
                            ?'#ffffff'
                            : '#2C2C2C',
                        "&.Mui-selected": {
                            WebkitBackgroundClip: "none",
                            WebkitTextFillColor: "white",
                            backgroundColor: "#c62676",
                            fontWeight: "bold",
                            borderRadius: "50px",
                            transition: "all 0.5s ease-out",
                          
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
