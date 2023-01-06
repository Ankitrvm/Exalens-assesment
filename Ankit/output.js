function apartmentHunting(blocks, reqs) {
  //Write your code here.
  try {
    const getAvailableIndexs = (currIndex, step) => {
      if (step === 0) {
        return [currIndex];
      }

      const availableIndexs = [];
      if (currIndex - step >= 0) {
        availableIndexs.push(currIndex - step);
      }
      if (currIndex + step <= blocks.length - 1) {
        availableIndexs.push(currIndex + step);
      }

      return availableIndexs;
    };

    const distance = [];

    blocks.forEach((_, currBlockI) => {
      let step = 0;

      const reqDistance = reqs.reduce((reqObj, reqKey) => {
        reqObj[reqKey] = undefined;

        return reqObj;
      }, {});

      const getUnsatisfiedReq = () =>
        Object.keys(reqDistance).reduce((unsatisfiedReqArr, reqKey) => {
          if (reqDistance[reqKey] === undefined) unsatisfiedReqArr.push(reqKey);
          return unsatisfiedReqArr;
        }, []);

      while (true) {
        const requirements = getUnsatisfiedReq();
        if (requirements.length === 0) {
          // all requirements satisfied. Calculate max distance for all requirements
          const maxDist = reqs.reduce(
            (max, reqKey) => Math.max(max, reqDistance[reqKey]),
            0
          );
          distance.push(maxDist);
          break;
        }
        const availableIndexs = getAvailableIndexs(currBlockI, step);
        if (availableIndexs.length === 0) {
          throw new Error(
            "No block contains following buildings: " + requirements.join(", ")
          );
        }

        availableIndexs.forEach((availableIndex) => {
          const block = blocks[availableIndex];
          requirements.forEach((req) => {
            if (block[req]) {
              reqDistance[req] = step;
            }
          });
        });
        step += 1;
      }
    });

    return distance.indexOf(Math.min(...distance));
  } catch (error) {
    console.log(error.message);
    return -1;
  }
}

// Do not edit the line below.
exports.apartmentHunting = apartmentHunting;
