import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { Container, Title, Form, Input, Submit, List } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'
import getRealm from '../../services/realm'

import Repository from '../../components/Repository'

const Main = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const saveRepository = async repository => {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count
    }

    const realm = await getRealm()

    realm.write(() => {
      realm.create('Repository', data)
    })
  }

  const handleRepository = async () => {
    try {
      const response = await api.get(`/repos/${input}`)
      await saveRepository(response.data)

      setInput('')
      setError(false)
      Keyboard.dismiss() // desce o teclado
    } catch (err) {
      setError(true)
    }
  }

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          onChangeText={setInput}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Procurar repositório'
        />
        <Submit onPress={handleRepository}>
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
