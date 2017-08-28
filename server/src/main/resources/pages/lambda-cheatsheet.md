a method return a value that has to be added to an ArrayList and you want to add the result to a list


for each element in a list, call a function that return an object that has to be added to an array list

List<Integer> dataSourceArrayList = Arrays.toList...

dataSourceArrayList
    .stream()
    .map(intValue -> getStringValue(intValue)
    .collect(Collectors.toList());
    
getStringValue(Integer intValue) {
switch (intValue) {
    1: return "one";
    2: return "two";
    default: return "too big ;)";

### (Spring) Validate an Optional result in a REST response

result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
