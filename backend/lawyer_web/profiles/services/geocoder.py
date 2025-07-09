import requests


class BaseGeocoder:
    @staticmethod
    def geocode(address):
        pass


class PhotonGeocoder(BaseGeocoder):
    @staticmethod
    def geocode(address):
        try:
            response = requests.get(
                'https://photon.komoot.io/api/',
                params={'q': address}
            )

            data = response.json()
            if data['features']:
                return data['features'][0]['geometry']['coordinates'][::-1]  # [долгота, широта] → [широта, долгота]
        except Exception as e:
            print(f"Ошибка: {e}")
            return None, None


class YandexGeocoder(BaseGeocoder):
    pass
