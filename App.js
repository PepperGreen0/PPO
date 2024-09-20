import { NavigationContainer } from '@react-navigation/native'; // นำเข้า NavigationContainer สำหรับการจัดการการนำทาง
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // นำเข้า createNativeStackNavigator สำหรับสร้างสแตกนำทาง

// นำเข้าคอมโพเนนต์หน้าต่าง ๆ ที่จะใช้ในแอป
import HomeScreen from './components/HomeScreen'; 
import AboutScreen from './components/AboutScreen'; 
import ContactScreen from './components/ContactScreen'; 
import JsonScreen from './components/JsonScreen'; 
import ClockScreen from './components/ClockScreen'; 
import insertDataScreen from './components/insertDataScreen'; 
import PostDataScreen from './components/PostDataScreen'; 

// สร้างตัวแปร Stack โดยใช้ createNativeStackNavigator
const Stack = createNativeStackNavigator();

// ฟังก์ชันหลักของแอป
export default function App() {
    return (
        <NavigationContainer> {/* แสดง NavigationContainer เพื่อรองรับการนำทาง */}
            <Stack.Navigator> {/* สร้างสแตกนำทาง */}
                {/* กำหนดหน้าต่างต่าง ๆ ใน Navigator */}
                <Stack.Screen
                    name="Home" // ชื่อหน้าจอ
                    component={HomeScreen} // คอมโพเนนต์ที่จะใช้สำหรับหน้าจอ Home
                />
                <Stack.Screen
                    name="About" // ชื่อหน้าจอ
                    component={AboutScreen} // คอมโพเนนต์สำหรับ About
                />
                <Stack.Screen
                    name="Contact" // ชื่อหน้าจอ
                    component={ContactScreen} // คอมโพเนนต์สำหรับ Contact
                />
                <Stack.Screen
                    name="JsonS" // ชื่อหน้าจอ
                    component={JsonScreen} // คอมโพเนนต์สำหรับ Json
                />
                <Stack.Screen
                    name="Post" // ชื่อหน้าจอ
                    component={PostDataScreen} // คอมโพเนนต์สำหรับ PostData
                />
                <Stack.Screen
                    name="insert" // ชื่อหน้าจอ
                    component={insertDataScreen} // คอมโพเนนต์สำหรับ InsertData
                />
                <Stack.Screen
                    name="Clock" // ชื่อหน้าจอ
                    component={ClockScreen} // คอมโพเนนต์สำหรับ Clock
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
