import React, { useEffect, useState } from 'react'
import Novel from '../components/Novel'
import Page from '../components/Page'
import Search from '../components/Search'
import Title from '../components/Title'
import { filterNovels, retrieveNovels } from '../utils/novels'


export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [novelsList, setNovelsList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])

  useEffect(() => {
    async function pullData() {
      const novels = await retrieveNovels()
      setNovelsList(novels)
      setFilteredNovelList(novels)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterNovels(novelsList, searchTerm)

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredNovelList.map(novel => (<Novel key={novel.id} title={novel.title} author={novel.author} />))
      }
    </Page>
  )
}
