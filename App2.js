import React, {useState, useEffect} from 'react';
import { View, Text, TextInput } from 'react-native';

const App2 = (props) => {
    const [name, setName] = useState('');
    const [timer, setTimer] = useState(20);

    useEffect(
        () => {
            console.log('.....1', timer)
            const interval = setInterval(() => {
                console.log('*******2', timer)
                if(timer <= 1){
                    setTimer(20)
                } else if(timer> 1) {
                    console.log('------3', timer)
                    setTimer(timer => timer - 1)
                } else {
                    console.log('------HELLO', timer)
                }
            }, 1000)

            return () => {
                console.log('=======4', timer)
                clearInterval(interval);
            };
        }, [timer])

    const onTextWrite = (value) => {
        setName(value);
    };

    return(
        <View style={{
            flex: 1,
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center'}}
        >
            <Text>{timer}</Text>
                <TextInput
                    style={{padding: 1, color: 'black', backgroundColor: 'silver', height: 60, width: 340}}
                    onChangeText={(val) => onTextWrite(val)}
                />
                <Text>{name + '.....'}</Text>
        </View>
    )
};

export default App2;
