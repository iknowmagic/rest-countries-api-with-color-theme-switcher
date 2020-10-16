import { countryService } from '@/services/http'

export const countries = {
  getAllCountries() {
    return countryService.get('/all')
  }
}
