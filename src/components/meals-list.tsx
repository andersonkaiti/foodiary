import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MealCard } from './meal-card'
import { MealsListHeader } from './meals-list-header'

const meals = [
  {
    id: String(Math.random()),
    name: 'Café da manhã',
  },
  {
    id: String(Math.random()),
    name: 'Almoço',
  },
  {
    id: String(Math.random()),
    name: 'Janta',
  },
]

export function MealsList() {
  const { bottom } = useSafeAreaInsets()

  return (
    <FlatList
      contentContainerClassName="gap-8 p-5"
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      data={meals}
      keyExtractor={(meal) => meal.id}
      ListHeaderComponent={MealsListHeader}
      renderItem={({ item: meal }) => (
        <MealCard id={meal.id} name={meal.name} />
      )}
    />
  )
}
