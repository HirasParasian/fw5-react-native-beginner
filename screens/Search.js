import FAicon from 'react-native-vector-icons/FontAwesome';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Text, FlatList, Image, Center } from 'native-base';
import { getVehicle } from '../src/redux/actions/vehicle';

const Search = ({ navigation }) => {
  const vehicle = useSelector(state => state.vehicle);
  const vehicles = useSelector(state => state.auth?.allVehicle);
  // console.log(vehicles);
  const dispatch = useDispatch();
  useEffect(() => {
    getProfiler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfiler = async () => {
    await dispatch(getVehicle());
  };
  const [search, setSearch] = useState('');
  const searchChange = e => {
    setSearch(e);
  };

  const removeHandler = () => {
    setSearch('');
  };
  const renderItem = ({ item }) => {
    let urlImg = {
      uri: item.image,
    };
    // console.log(urlImg);
    return (
      <View style={styles.elevate}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Reservation', { vehicleId: item.vehicleId })
          }
          style={styles.coverImg}>
          <Image
            width={'100%'}
            height="180"
            alt={item.location}
            source={urlImg}
            style={styles.listImg}
          />
        </TouchableOpacity>
        <View style={styles.textVehicle}>
          <Text style={styles.text}>
            Kintamani, 0.1 miles from your location
          </Text>
          <View style={styles.rows}>
            <View>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textAvailable}>Available</Text>
            </View>
            <Text style={styles.price}>Rp. {item.price}/Day</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View>
        <Box style={styles.line} w="100%" px="5" py="3">
          <Input
            w="100%"
            backgroundColor={'rgba(245, 109, 145, 0.3)'}
            _focus={{ borderColor: 'red.400' }}
            style={styles.inputSearch}
            value={search}
            onChangeText={searchChange}
            placeholder="Search Vehicle"
            placeholderTextColor={'#8D8DAA'}
            InputLeftElement={
              <FAicon
                color={'#8D8DAA'}
                name="search"
                size={20}
                style={styles.search}
              />
            }
            InputRightElement={
              search ? (
                <FAicon
                  onPress={removeHandler}
                  color={'#F56D91'}
                  name="remove"
                  size={16}
                  style={styles.delete}
                />
              ) : null
            }
          />
          <TouchableOpacity style={styles.row}>
            <FAicon
              color={'#8D8DAA'}
              name="filter"
              size={25}
              style={styles.filter}
            />
            <Text>Filter</Text>
          </TouchableOpacity>
        </Box>
        <View style={styles.main}>
          <FlatList
            data={vehicles}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    paddingBottom: 400,
  },
  text: {
    fontSize: 16,
    color: 'grey',
  },
  textName: {
    fontSize: 16,
    color: '#8D8DAA',
    fontWeight: 'bold',
  },
  textAvailable: {
    fontSize: 16,
    color: '#F56D91',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 25,
    color: '#F56D91',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  textVehicle: {
    backgroundColor: 'pink',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  elevate: {
    marginVertical: 20,
    elevation: 5,
    borderRadius: 30,
  },
  listImg: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  coverImg: {
    elevation: 3,
  },
  search: {
    marginLeft: 16,
  },
  delete: {
    marginRight: 16,
  },
  line: {
    borderBottomColor: '#F5F5F5',
  },
  filter: {
    marginVertical: 15,
    marginEnd: 10,
  },
  rows: {
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
});
export default Search;
