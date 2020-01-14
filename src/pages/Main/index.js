import React from 'react'
import { View } from 'react-native'
import { Container, Title, Form, Input, Submit, List } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Repository from '../../components/Repository'

const Main = () => {
  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="Procurar repositório"
        />
        <Submit onPress={() => {}}>
          <Icon name='add' size={12} color='#FFF' />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps='handled'
        data={[
          {
            id: 1,
            name: 'unform',
            description: 'aaa',
            stars: 1234,
            forks: 133
          }
        ]}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Repository data={item} />
        )}
        />
    </Container>
  )
}

export default Main
