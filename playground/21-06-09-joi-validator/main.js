const fs = require('fs');
const fusionDataSchema = require('./fusionDataSchema');

const csvPath = `${__dirname}/tfusion_new.csv`;

function getTracksList(csvPath) {
  let csvData = fs.readFileSync(csvPath);
  csvData = csvData.toString();
  const tracksList = [];
  let rows = [];
  rows = csvData.split('\n');
  for (let i = 0; i < rows.length; i++) {
    try {
      const parsedData = JSON.parse(rows[i]);
      const fusionData = JSON.parse(parsedData.fusion_data);
      tracksList.push(fusionData);
    } catch (err) {
      // console.error(err);
    }
  }

  return tracksList;
}

function tracksFilter(_tracks) {
  const tracks = JSON.parse(JSON.stringify(_tracks));
  const DISABLE_TRACK_ITEM_LIST = ['text', 'sequence_title', 'sequence_image', 'sequence_effect', 'sequence'];
  const DISABLE_OPERATION_LIST = ['trans_audio_fade_inout'];

  for (let i = 0; i < tracks.length; i++) {
    tracks[i].items = tracks[i].items.filter((item) => !DISABLE_TRACK_ITEM_LIST.includes(item.type));
    for (let j = 0; j < tracks[i].items.length; j++) {
      if (tracks[i].items[j].operations && tracks[i].items[j].operations.length > 0) {
        tracks[i].items[j].operations = tracks[i].items[j].operations.filter((operation) => !DISABLE_OPERATION_LIST.includes(operation.type));
      }
    }
  }

  return tracks;
}

const tracksList = getTracksList(csvPath);

(async () => {
  for (const tracks of tracksList) {
    try {
      const newTracks = tracksFilter(tracks);

      await fusionDataSchema.validateAsync(newTracks, {
        abortEarly: true, // true：第一个错误，false：把所有的错误报出来
        convert: false,
      });
    } catch (err) {
      console.error('校验失败: ', err.message);
      console.log(JSON.stringify(tracks));
    }
  }
})();
