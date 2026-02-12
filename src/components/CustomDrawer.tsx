import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from '../../assets/index';

export default function CustomDrawer(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <View style={styles.drawerContent}>
                <View style={styles.logoContainer}>
                    <Image source={Icon} style={styles.logoIcon} />
                    <Text style={styles.logoText}>Coleta IATER</Text>
                </View>
                <View style={styles.drawerItems}>
                    <DrawerItemList {...props} />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContent: {
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    logoIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    logoText: {
        color: '#2E7D32',
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItems: {
        marginLeft: 20,
    },
});