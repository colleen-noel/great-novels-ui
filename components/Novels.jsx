import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'
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
    <div className="page">
      <div className="title">Great Novels </div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredNovelList.map(novel => (<Novel key={novel.id} title={novel.title} author={novel.author} />))
      }
    </div>
  )
}
