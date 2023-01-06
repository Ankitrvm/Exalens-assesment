Approach

As mentioned in question requirement, we will be recieving two arrays:
- reqs: which contains all the important buildings that should be present in a particular block 
- blocks: which contains an array of objects with their keys as *reqs* array items

For the sake of this solution we will use following terminology - 
- **block**: each object in blocks array
- **requirement**: each string in reqs array 
- **walk distance**: maximum distance that we have to walk in order to reach all the requirements 

In the following solution, we will return -1 with a valid message in case a particular requirement is missing from all the blocks.

To find a solution, my approach was to first iterate through all the blocks, find out their *walk distance* and store it in a distance array. Then, we would simply return the index of the minimum number in our distance array to get the most optimal block.

In each iteration we do the following to find *walk distance* for a particular block:

Lets assume that we have the following as input:
const blocks = [{ gym: false }, { gym: true }, { gym: false }, { gym: false }];
const reqs = ['gym'];

And then lets say that currently we are on index 2 in our for loop.

So, inorder to find the optimal block we would start from index 2 in our while loop (which is also the current index in our for loop) and check if it has all the requirements: 
- If it has, then we find the *walk distance* and break from while loop to find walk distance for next requirement 
- If not, then we use **getAvailableIndexs** helper function to find the next adjacent blocks *step* index away and check if it contains the requirement we are checking for and it goes on till we have found all the requirements or if no block contains our requirement (Edge Case).

Helper functions used are:
**getAvailableIndexs**: returns valid adjacent block indexes step index away from our current index.
**getUnsatisfiedReq**: checks all keys in *reqDistance object* and returns all the requirements that have not yet been found on any block.