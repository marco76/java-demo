package io.javademo.examples.bv.positivenegative;

import javax.validation.constraints.Negative;
import javax.validation.constraints.NegativeOrZero;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

/**
 * Created by marcomolteni on 15.07.17.
 */
public class NumbersBean {

    @Negative
    private BigDecimal elevationOfDeathValley;
    @PositiveOrZero
    private BigDecimal numberOfBugsInYourCode;
    @NegativeOrZero
    private BigDecimal negativeNumberInFrBe;
    @Positive
    private Integer numberOfJavaDevelopers;

    public BigDecimal getElevationOfDeathValley() {
        return elevationOfDeathValley;
    }

    public void setElevationOfDeathValley(BigDecimal elevationOfDeathValley) {
        this.elevationOfDeathValley = elevationOfDeathValley;
    }

    public BigDecimal getNumberOfBugsInYourCode() {
        return numberOfBugsInYourCode;
    }

    public void setNumberOfBugsInYourCode(BigDecimal numberOfBugsInYourCode) {
        this.numberOfBugsInYourCode = numberOfBugsInYourCode;
    }

    public BigDecimal getNegativeNumberInFrBe() {
        return negativeNumberInFrBe;
    }

    public void setNegativeNumberInFrBE(BigDecimal negativeNumberInFrBE) {
        this.negativeNumberInFrBe = negativeNumberInFrBE;
    }

    public Integer getNumberOfJavaDevelopers() {
        return numberOfJavaDevelopers;
    }

    public void setNumberOfJavaDevelopers(Integer numberOfJavaDevelopers) {
        this.numberOfJavaDevelopers = numberOfJavaDevelopers;
    }
}
