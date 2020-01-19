import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { Container, Title, Form, Input, Submit, List } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'
import getRealm from '../../services/realm'

import Repository from '../../components/Repository'

const Main = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    const loadRepositories = async () => {
      const realm = await getRealm()

      // console.log(realm.path)

      const data = realm.objects('Repository').sorted('stars', true)

      setRepositories(data)
    }

    loadRepositories()
  }, [])

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
      realm.create('Repository', data, 'modified')
    })

    return data
  }

  const handleAddRepository = async () => {
    try {
      const response = await api.get(`/repos/${input}`)
      await saveRepository(response.data)

      setInput('')
      setError(false)
      Keyboard.dismiss() // desce o teclado
    } catch (err) {
      setError(true)
      console.log(err)
    }
  }

  const handleRefreshRepository = async (repository) => {
    const response = await api.get(`/repos/${repository.fullName}`)

    const data = await saveRepository(response.data)

    setRepositories(repositories.map(repo => (repo.id === data.id ? data : repo)))
  }

  return (
    <Container>
      {console.log(repositories)}
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          onChangeText={setInput}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Procurar repositório'
          error={error}
        />
        <Submit onPress={handleAddRepository}>
          <Icon name='add' size={12} color='#FFF' />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps='handled'
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Repository data={item} onRefresh={() => handleRefreshRepository(item)} />
        )}
      />
    </Container>
  )
}

export default Main
