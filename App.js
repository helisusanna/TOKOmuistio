import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { Provider as PaperProvider, 
  DefaultTheme,
  BottomNavigation,
  Avatar,
  Card, 
  Appbar, 
  List,
  Text, 
  Button,
  IconButton,
  Divider,
  Portal, 
  FAB, 
  RadioButton, 
  Dialog,
  TextInput,
  Headline,
  Subheading, } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';

const db = SQLite.openDatabase("treeneja.db");

db.transaction(
    (tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS treenit (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      liike TEXT, luokka TEXT, video TEXT, pvm TEXT, suosikki BIT
                    )`);
    }, 
    (err) => {
      console.log(err);
    });

/*------------------esimerkit--------------------
db.transaction(
  (tx) => {
    tx.executeSql(`INSERT OR IGNORE INTO treenit (id, liike, luokka, video, pvm, suosikki) 
                  VALUES (1, "Esimerkki html5", "alo", "https://www.w3schools.com/html/mov_bbb.mp4", "15.3.2021", 0)
                  `);
  },  
  (err) => {
    console.log(err);
  });

  db.transaction(
    (tx) => {
      tx.executeSql(`INSERT OR IGNORE INTO treenit (id, liike, luokka, video, pvm, suosikki) 
                    VALUES (2, "Nouto", "avo", "https://helisusanna.cdn.spotlightr.com/watch/MTA5ODUwNA==", "14.3.2021", 1)
                    `);
    }, 
    (err) => {
      console.log(err);
    });
----------------------------------------------*/

export default function App() {

  const [treenit, setTreenit] = useState([]);
  const [uusiLiike, setUusiLiike] = useState();
  const [uusiVideo, setUusiVideo] = useState();
  const [luokka, setLuokka] = useState("alo");
  const [lisatty, setLisatty] = useState(false);
  const [url, setUrl] = useState();
  const [Dialogi, setDialogi] = useState({ 
                                          nayta : false });
  const [VideoDialogi, setVideoDialogi] = useState({ 
                                          nayta : false });


  const SelaaRoute = () =>  <ScrollView style={styles.container}>
                              <Headline style={styles.otsikko}>Selaa treenejä</Headline>
                              <Divider/>
                              {(treenit[0])
                              ? treeniLista()
                              : <Text style={styles.eiteksti}>Ei lisättyjä liikkeitä</Text>
                              }
                              {(url)
                              ?
                              <Portal>
                                <Dialog 
                                      visible={VideoDialogi.nayta} 
                                      onDismiss={() => { setVideoDialogi({ nayta : false })}}
                                      style={{ height: "30%", width: "90%", right: 5,}}
                                >
                                  {(url.endsWith(".mp4"))
                                  ? 
                                  <View style={{ height: "100%", width: "100%",}}>
                                    <Video 
                                        source={{uri:url}}
                                        useNativeControls
                                        resizeMode="cover"
                                        shouldPlay
                                        style={{  height: "100%",
                                                  width: "100%",
                                                  alignItems: 'center',
                                                  justifyContent: 'center' }}
                                    />
                                  </View>
                                  : 
                                  <WebView
                                    source={{html: `<iframe width="100%" height="100%" src=${url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}}
                                  />
                                  }

                                </Dialog>
                              </Portal>
                              : null}
                            </ScrollView>

  const UusiRoute = () =>   <ScrollView style={styles.container}>
                              <Headline style={styles.otsikko}>Lisää uusi treeni</Headline>
                              <Divider/>
                              <Card style={styles.cardButton}>
                                <Card.Content>
                                <FAB
                                    style={styles.videoButton}
                                    theme={theme_sininen}
                                    large
                                    icon="video-vintage"
                                    onPress={() => { lisaaUusi() }}
                                  />
                              </Card.Content>
                              </Card>

                              <Card style={styles.card}>
                              <RadioButton.Group 
                                onValueChange={uusiLuokka => setLuokka(uusiLuokka)} 
                                value={luokka} 
                                style={{margin:"5%"}}>
                                <Subheading style={{marginTop:"10%"}}>Valitse liikkeen kilpailuluokka</Subheading>
                                <View>
                                  <Text style={styles.radioText}>ALO (Alokas)</Text>
                                  <RadioButton theme={theme} value="alo" uncheckedColor="#003070"/>
                                </View>
                                <View>
                                  <Text style={styles.radioText}>AVO (Avoin)</Text>
                                  <RadioButton theme={theme} value="avo" uncheckedColor="#003070"/>
                                </View>
                                <View>
                                  <Text style={styles.radioText}>VOI (Voittaja)</Text>
                                  <RadioButton theme={theme} value="voi" uncheckedColor="#003070"/>
                                </View>
                                <View>
                                  <Text style={styles.radioText}>EVL (Erikoisvoittaja)</Text>
                                  <RadioButton theme={theme} value="evl" uncheckedColor="#003070"/>
                                </View>
                              </RadioButton.Group>
                              </Card>
                              {(uusiVideo != undefined && uusiLiike != undefined)
                              ? <Button style={{marginTop:"10%"}} icon="plus" theme={theme} mode="contained" onPress={() => lisaaTreeni()}>
                                Valmis
                              </Button>
                              : null
                              }
                              {(lisatty)
                              ? <Button style={{marginTop:"10%"}} icon="check" theme={theme} mode="contained" onPress={() => lisaaUusi()}>
                                Lisätty! Lisää uusi
                              </Button>
                              : null
                              }
                            </ScrollView>


const SuosikitRoute = () =>  <ScrollView style={styles.container}>
                              <Headline style={styles.otsikko}>Onnistumiset</Headline>
                              <Divider/>

                              {(suosikkiLista().length>0)
                              ? suosikkiLista()
                              : <Text style={styles.eiteksti}>Ei yhtään onnistuneeksi merkittyä treeniä</Text>
                              }

                              {(url)
                              ?
                              <Portal>
                                <Dialog 
                                      visible={VideoDialogi.nayta} 
                                      onDismiss={() => { setVideoDialogi({ nayta : false })}}
                                      style={{ height: "30%", width: "90%", right: 5,}}
                                >
                                  {(url.endsWith(".mp4"))
                                  ? 
                                  <View style={{ height: "100%", width: "100%",}}>
                                    <Video 
                                        source={{uri:url}}
                                        useNativeControls
                                        resizeMode="cover"
                                        shouldPlay
                                        style={{  height: "100%",
                                                  width: "100%",
                                                  alignItems: 'center',
                                                  justifyContent: 'center' }}
                                    />
                                  </View>
                                  : 
                                  <WebView
                                    source={{html: `<iframe width="100%" height="100%" src=${url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}}
                                  />
                                  }
                                </Dialog>
                              </Portal>
                              : null}
                            </ScrollView>

  const BottomNavi = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'selaa', title: 'Selaa', icon: 'dog-side' },
      { key: 'uusi', title: 'Lisää uusi', icon: 'video-vintage' },
      { key: 'suosikit', title: 'Onnistumiset', icon: 'star-circle' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      selaa: SelaaRoute,
      uusi: UusiRoute,
      suosikit: SuosikitRoute,
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{backgroundColor:"#000"}}
      />

    );
  };

  //uusi-dialogi näkymään
  const lisaaUusi = () => {
    setDialogi({ nayta: true });
    setLisatty(false);
  }

  //videoplayer-dialogi näkymään
  const videoUrl = (url) => {
    treenit.map((treeni) => {
      if (treeni.id===url){
        setUrl(treeni.video);
        setVideoDialogi({ nayta: true });
      }
    });
  }

  //selaa-route
  const treeniLista = () => {

    let lista=[];

    treenit.map((treeni) => {
      if(treeni.suosikki){
        lista.push(
          <List.Item
            theme={theme}
            key={treeni.id} 
            title={treeni.liike} 
            description= {`${treeni.luokka.toUpperCase()} - ${treeni.pvm}`}       
            left={() => <IconButton size={40} color="#003070" icon="play-circle" onPress={() => videoUrl(treeni.id)}/>}
            right={() => <IconButton size={40} color="#FFB7D6" icon="star" onPress={() => poistaSuosikeista(treeni.id)}/>}
          />
        );
      } else {
        lista.push(
          <List.Item
            theme={theme}
            key={treeni.id} 
            title={treeni.liike} 
            description= {`${treeni.luokka.toUpperCase()} - ${treeni.pvm}`}       
            left={() => <IconButton size={40} color="#003070" icon="play-circle" onPress={() => videoUrl(treeni.id)}/>}
            right={() => <IconButton  size={40} color="#FFB7D6" icon="star-outline" onPress={() => lisaaSuosikiksi(treeni.id)}/>}
          />
        );
      }
      
    });
    return lista;
  }

  const lisaaSuosikiksi = (id) => {

    db.transaction(
      (tx) => {
        tx.executeSql(`UPDATE treenit set suosikki=1 WHERE id=?`, [id], 
          (_tx, rs) => {
            haeTreenit();
          }
        )
      }, 
      (err) => {
        console.log(err)
      }); 

  } 

  const poistaSuosikeista = (id) => {

    db.transaction(
      (tx) => {
        tx.executeSql(`UPDATE treenit set suosikki=0 WHERE id=?`, [id], 
          (_tx, rs) => {
            haeTreenit();
          }
        )
      }, 
      (err) => {
        console.log(err)
      }); 

  }

  //suosikit-route
  const suosikkiLista = () => {

    let suosikkilista=[];

    treenit.map((treeni) => {
      if(treeni.suosikki){
        suosikkilista.push(
          <List.Item
            key={treeni.id} 
            title={treeni.liike} 
            description= {`${treeni.luokka.toUpperCase()} - ${treeni.pvm}`}       
            left={() => <IconButton size={40} color="#003070" icon="play-circle" onPress={() => videoUrl(treeni.id)}/>}
            right={() => <IconButton  size={40} color="#FFB7D6" icon="star" onPress={() => poistaSuosikeista(treeni.id)}/>}
          />
        );
      } 
    });
    return suosikkilista;
  }

  const lisaaTreeni = async () => {

    let dd = new Date().getDate();
    let mm = new Date().getMonth()+1;
    let yyyy= new Date().getFullYear();
    let pvm = dd + "." + mm + "." + yyyy;

    setLisatty(true);
    setUusiLiike();
    setUusiVideo();

    db.transaction(
      (tx) => {
        tx.executeSql(`INSERT INTO treenit (liike, luokka, video, pvm, suosikki) VALUES (?, ?, ?, ?, ?)`, [uusiLiike, luokka, uusiVideo, pvm, 0], 
          (_tx, rs) => {
            haeTreenit();
          }
        )
      }, 
      (err) => {
        console.log(err)
      }); 

  }

  const haeTreenit = () => {

    db.transaction(
        (tx) => {
          tx.executeSql(`SELECT * FROM treenit`, [], 
            (_tx, rs) => {
              setTreenit(rs.rows._array);
            }
          )
        }, 
        (err) => {
          console.log(err)
        });    

  }

  useEffect(() => {
    haeTreenit();
  }, []);

  return (
      <PaperProvider>
        <Appbar.Header style={{backgroundColor:"#000"}}>
          <Avatar.Icon size={35} icon="dog" style={{backgroundColor:"#FFB7D6", marginLeft:"3%"}}/>
          <Appbar.Content title="TOKO-muistio"/>
        </Appbar.Header>
          {BottomNavi()}

          <Portal>
            <Dialog theme={theme} visible={Dialogi.nayta} onDismiss={() => { setDialogi({ nayta : false })}}>
              <Dialog.Title>Uusi liike</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  theme={theme_sininen}
                  label="Liike..."
                  mode="outlined"
                  placeholder="Kirjoita tunniste liikkeelle"
                  value={uusiLiike}
                  onChangeText={ (teksti) => { setUusiLiike( teksti ) } }
                />
                <TextInput
                  theme={theme_sininen}
                  label="Video url"
                  mode="outlined"
                  placeholder="Liitä videon url"
                  value={uusiVideo}
                  onChangeText={ (teksti) => { setUusiVideo( teksti ) } }
                />
              </Dialog.Content>
              <Dialog.Actions>
              <Button 
                theme={theme_sininen} 
                style={{marginRight:"5%"}}
                icon="check"
                onPress={() => { setDialogi({ nayta: false }) }}>
                OK
              </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

      </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    padding : 20
  },
  radioText: {
    position:"absolute", 
    marginTop:"3%", 
    marginLeft:"25%"
  },
  cardButton: {
    height:150,
    alignItems: 'center',
    backgroundColor: "#ededed",
    elevation: 0,
  },
  card: {
    alignItems: 'center',
    backgroundColor: "#ededed",
    elevation: 0,
  },
  videoButton: {
    marginTop: 40
  },
  otsikko : {
    textAlign: "center",
    paddingBottom: "3%",
  },
  eiteksti : {
    textAlign: "center",
    marginTop:"5%",

  }
});

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: "#FFB7D6",
    accent: "#FF7EC1",
    surface: "#ededed",
    placeholder: "#000F1F",
    background: "#ededed",
  }
};

const theme_sininen = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: "#003070",
    accent: "#003070",
    background: "#ededed",
    surface: "#ededed",
  }
};
