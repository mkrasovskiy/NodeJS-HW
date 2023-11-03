function findDiscriminant(a, b, c) {
    var discriminant = (b * b) - (4 * a * c);
    return discriminant;
}

module.exports = { findDiscriminant };