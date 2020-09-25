import * as React from 'react'
import { View,Text,TouchableOpacity } from 'react-native'
import styled from 'styled-components';

const Header = styled.View`
  flex: 1,
  backgroundColor: 'red',
  borderWidth: 1,
  borderColor: 'blue',
  borderTop: 1,
  borderBottom: 1
`;

const ContainerContact = styled.View`
    flex: 3,
    backgroundColor: 'green',
    borderWidth: 1,
    borderColor: 'white',
    borderTop: 1,
    borderBottom: 1
`;


export default class contactosScreen extends React.Component{
    render(){
        return(
            <View>
                <Header>

                     <TouchableOpacity>
                         <Text> Contactos </Text>
                     </TouchableOpacity>

                     <TouchableOpacity>
                         <Text> Grupos </Text>
                     </TouchableOpacity>

                </Header>

                <ContainerContact>
                    <Text>Contacts</Text>
                </ContainerContact>

            </View>
        )
    }
}